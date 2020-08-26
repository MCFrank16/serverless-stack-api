import * as uuid from 'uuid';
import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';

export const main = handler( async (event, context) => {
    // parse the input from the event.body
   const data = JSON.parse(event.body);

   const params = {
       TableName: process.env.tableName,
       Item: {
           userId: event.requestContext.identity.cognitoIdentityId,
           notesId: uuid.v4(),
           content: data.content,
           attachment: data.attachment,
           createdAt: Date.now()
       }
   };

   await dynamoDB.put(params);

   return params.Item;
});

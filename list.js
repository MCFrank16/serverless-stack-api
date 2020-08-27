import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const params = {
      TableName: process.env.tableName,
      // keyConditionExpression defines the condition for the query
      // 'userId = :userId': only return items with matching 'userId'

      // ExpressionAttributeValues defines the value in the condition
      //'userId' defines 'userId' to be Identity Pool identity id of the authenticated user

      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
          ":userId": event.requestContext.identity.cognitoIdentityId
      }
  };

  const result = await dynamoDB.query(params);

  return result.Items;
});

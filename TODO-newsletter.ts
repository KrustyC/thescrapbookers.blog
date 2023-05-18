// import { Handler, HandlerEvent } from "@netlify/functions";
// import mailchimp, { type ErrorResponse } from "@mailchimp/mailchimp_marketing";
// import { jsonResponse } from "../shared/utils";
// import { HTTP_METHODS } from "../shared/variables";

// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_API_KEY as string,
//   server: process.env.MAILCHIMP_SERVER as string,
// });

// function isMemberErrorResponse(error: any): error is ErrorResponse {
//   return !!(error as any).status;
// }

// async function post(event: HandlerEvent) {
//   const data = event.body ? JSON.parse(event.body) : undefined;

//   if (!data?.email) {
//     return jsonResponse({
//       status: 404,
//       body: {
//         message: "email is a mandatory field",
//       },
//     });
//   }

//   try {
//     await mailchimp.lists.addListMember(
//       process.env.MAILCHIMP_AUDIENCE_ID as string,
//       {
//         email_address: data.email,
//         merge_fields: {
//           FNAME: data?.firstName || undefined,
//         },
//         status: "subscribed",
//       }
//     );

//     return jsonResponse({
//       status: 200,
//       body: { message: "Members succesfully subscribed to newsletter" },
//     });
//   } catch (error: unknown) {
//     if (isMemberErrorResponse(error)) {
//       return jsonResponse({
//         status: 400,
//         body: {
//           message: "Members already exist",
//         },
//       });
//     }

//     return jsonResponse({
//       status: 500,
//       body: {
//         message: "Unexpected error while adding member to newsletter",
//       },
//     });
//   }
// }

// const handler: Handler = async (event) => {
//   if (event.httpMethod !== HTTP_METHODS.POST) {
//     return jsonResponse({
//       status: 405,
//       body: { message: "Method not allowed" },
//     });
//   }

//   return post(event);
// };

// export { handler };

console.log('TODO-newsletter.ts')
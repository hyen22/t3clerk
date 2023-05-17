import type { NextApiRequest, NextApiResponse } from "next";
import { Metadata, Server, type Upload } from "@tus/server";
import type { IncomingMessage, ServerResponse } from "http";
import { FileStore } from "@tus/file-store";
import { S3Store } from "@tus/s3-store";
import crypto from "crypto";
import { getAuth } from "@clerk/nextjs/server";

/**
 * !Important. This will tell Next.js NOT Parse the body as tus requires
 * @see https://nextjs.org/docs/api-routes/request-helpers
 */
export const config = {
  api: {
    bodyParser: false,
  },
};
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const tusServer = new Server({
  // `path` needs to match the route declared by the next file router
  // ie /api/upload
  path: "/api/tusupload",
  datastore: new FileStore({directory: './files'}),
  respectForwardedHeaders: true,
  relativeLocation: true,
  // onUploadCreate: async (req: IncomingMessage, res: ServerResponse, upload: Upload) => {
  //   console.log('Metadata before upload is:', upload)
  //   return res
  // },
  
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return tusServer.handle(req, res);
}

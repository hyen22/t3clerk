
import Uppy from "@uppy/core";
import FileInput from "@uppy/file-input";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
const Upload: React.FC = () => {
  const uppy = new Uppy({
    restrictions: {
      maxFileSize: 100000000,
      minNumberOfFiles: 1,
      allowedFileTypes: ["image/*"],
    },
  })
    .use(FileInput)
    .use(
      Tus,
      {
        endpoint: "https://rakno.tk/api/tusupload",
        retryDelays: [0, 1000, 3000, 5000],
        removeFingerprintOnSuccess: true,
        // headers: {
        //   "X-Forwarded-Proto": "https",
        // },
      },
    )
    .on('error', (error: any) => console.log(error))
    .on("complete", async (result) => {
      console.log("failed files:", result.failed);
      const uploadedFiles = result.successful;
      console.log("successful files:", uploadedFiles);
    });
    return (
      <>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload file
      </button>
      <Dashboard uppy={uppy} plugins={["FileInput"]} />
    </>
    )
}
export default Upload
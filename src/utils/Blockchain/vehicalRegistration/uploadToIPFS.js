import axios from "axios";
import FormData from "form-data";

const uploadToIPFS = async (file, folderName) => {
  const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const pinataSecretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

  console.log("Pinata API Key:", pinataApiKey);
  console.log("Pinata Secret Key:", pinataSecretKey);

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "pinataMetadata",
    JSON.stringify({
      name: `${folderName}-${Math.random()}-${Date.now()}`,
      keyvalues: {
        folder: folderName,
      },
    })
  );
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 0 }));

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretKey,
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error.message);
    throw new Error("IPFS upload failed");
  }
};

export { uploadToIPFS };

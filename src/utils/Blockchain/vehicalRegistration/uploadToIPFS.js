import axios from "axios";
import FormData from "form-data";

export const uploadToIPFS = async (file, folderName) => {
  //   const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;
  //   const pinataSecretKey = import.meta.env.VITE_PINATA_SECRET_KEY;
  const pinataApiKey = "d6f7fc2b85d70ffca65f";
  const pinataSecretKey =
    "73fde41be1f05b853b53821fccbd98747eb03721df2fa8513b935afd69b97c4e";
  console.log(pinataApiKey);
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
      `https://api.pinata.cloud/pinning/pinFileToIPFS`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: pinataApiKey, // Use the variable here
          pinata_secret_api_key: pinataSecretKey, // Use the variable here
        },
      }
    );
    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error.message);
    throw new Error("IPFS upload failed");
  }
};

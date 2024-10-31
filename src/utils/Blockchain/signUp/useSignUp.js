import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { writeContractInstance } from "../writeContractInstance";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signUp = async (formData) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      username,
      phoneNumber,
    } = formData;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (typeof window.ethereum === "undefined") {
        console.error("Ethereum provider is not available.");
        setError("Ethereum provider is not available.");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const infuraProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await infuraProvider.getSigner();
      console.log(signer);
      const contractWithSigner = writeContractInstance.connect(signer);

      const tx = await contractWithSigner.signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        username,
        phoneNumber
      );

      await tx.wait();
      setSuccess(true);
      toast.success("Sign up successful!");
    } catch (error) {
      console.error("Error during sign up:", error);
      setError(error.message || "Sign up failed.");
      toast.error(error.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading, error, success };
};

export { useSignUp };

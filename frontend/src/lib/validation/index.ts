import { z } from "zod";

export const SignupValidation = z
  .object({
    nomUtilisateur: z.string().min(2).max(50),
    email: z.string().email(),
    motDePasse: z.string().min(8, "Password must contain at least 8 characters")
    
  })


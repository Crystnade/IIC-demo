import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerParticipant } from "../api";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  branch: string;
  event: string;
};

export function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await registerParticipant(data);
      toast.success("Successfully registered for TechCon 2026!");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center p-4 bg-neutral-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl"
      >
        <div className="mb-8 text-center space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">Register</h2>
          <p className="text-neutral-400">Join us for the premier developer conference.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-neutral-300">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              id="name"
              className="w-full h-11 px-4 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Jane Doe"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300">Email Address</label>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                })}
                id="email"
                type="email"
                className="w-full h-11 px-4 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="jane@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-300">Phone Number</label>
              <input
                {...register("phone", { required: "Phone is required" })}
                id="phone"
                type="tel"
                className="w-full h-11 px-4 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="branch" className="block text-sm font-medium text-neutral-300">Branch of Study</label>
              <select
                {...register("branch", { required: "Branch is required" })}
                id="branch"
                className="w-full h-11 px-4 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option value="">Select branch...</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Other">Other</option>
              </select>
              {errors.branch && <p className="text-red-400 text-sm">{errors.branch.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="event" className="block text-sm font-medium text-neutral-300">Track Preference</label>
              <select
                {...register("event", { required: "Event preference is required" })}
                id="event"
                className="w-full h-11 px-4 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              >
                <option value="">Select a track...</option>
                <option value="Frontend Engineering">Frontend Engineering</option>
                <option value="Backend Systems">Backend Systems</option>
                <option value="Web3 & Blockchain">Web3 & Blockchain</option>
                <option value="Design Systems">Design Systems</option>
              </select>
              {errors.event && <p className="text-red-400 text-sm">{errors.event.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Submit Registration</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { submitFeedback } from "../api";
import { Loader2, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

type FeedbackFormValues = {
  name: string;
  email: string;
  rating: string;
  comments: string;
};

export function Feedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FeedbackFormValues>();

  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    try {
      await submitFeedback(data);
      toast.success("Thank you for your feedback!");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit feedback.");
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
          <div className="mx-auto w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Event Feedback</h2>
          <p className="text-neutral-400">Tell us how we did and how we can improve.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-neutral-300">Name (Optional)</label>
            <input
              {...register("name")}
              id="name"
              className="w-full h-11 px-4 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-300">Email Address (Optional)</label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="w-full h-11 px-4 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="rating" className="block text-sm font-medium text-neutral-300">Overall Rating</label>
            <select
              {...register("rating", { required: "Please select a rating" })}
              id="rating"
              className="w-full h-11 px-4 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
            >
              <option value="">Select a rating...</option>
              <option value="5">Excellent (5)</option>
              <option value="4">Very Good (4)</option>
              <option value="3">Good (3)</option>
              <option value="2">Fair (2)</option>
              <option value="1">Poor (1)</option>
            </select>
            {errors.rating && <p className="text-red-400 text-sm">{errors.rating.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="comments" className="block text-sm font-medium text-neutral-300">Comments</label>
            <textarea
              {...register("comments", { required: "Please leave a comment" })}
              id="comments"
              rows={4}
              className="w-full p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              placeholder="What did you like? What could be improved?"
            />
            {errors.comments && <p className="text-red-400 text-sm">{errors.comments.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Feedback"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

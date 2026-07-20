import { motion, AnimatePresence } from "framer-motion";

interface GreetingBannerProps {
  isVisible: boolean;
  greetingText: string;
}

export function GreetingBanner({
  isVisible,
  greetingText,
}: GreetingBannerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="font-medium text-lg tracking-wide text-foreground">
            {greetingText}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

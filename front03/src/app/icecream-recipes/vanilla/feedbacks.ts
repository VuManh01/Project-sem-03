export interface Feedback {
  feedbackId: number;
  fullName: string;  // Updated to FullName
  email: string;
  title: string;     // Added Title
  content: string;
  createdAt: string; // Added CreatedAt (using string to handle ISO format)
}

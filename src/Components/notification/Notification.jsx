// commonAlerts.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Initialize SweetAlert2 with React
const MySwal = withReactContent(Swal);
// Success alert
export const showSuccessAlert = (title, message) => {
  return MySwal.fire({
    icon: "success",
    title: title || "Success",
    text: message || "Operation completed successfully!",
    confirmButtonText: "OK",
  });
};

// Error alert
export const showErrorAlert = (title, message) => {
  return MySwal.fire({
    icon: "error",
    title: title || "Error",
    text: message || "Something went wrong!",
    confirmButtonText: "OK",
  });
};

// Confirmation alert
export const showConfirmationAlert = (title, message, confirmCallback) => {
  return MySwal.fire({
    title: title || "Are you sure?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, confirm",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed && confirmCallback) {
      confirmCallback();
    }
  });
};

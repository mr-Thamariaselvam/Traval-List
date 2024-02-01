export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^[6-9]\d{9}$/;
  return phoneNumberRegex.test(phoneNumber);
};

export const validateInput = (email, password, phoneNumber) => {
  if (!validateEmail(email)) {
    return "Invalid email format";
  }

  if (!validatePassword(password)) {
    return "Invalid password format";
  }

  if (!validatePhoneNumber(phoneNumber)) {
    return "Invalid phone number";
  }

  return null; // No errors
};

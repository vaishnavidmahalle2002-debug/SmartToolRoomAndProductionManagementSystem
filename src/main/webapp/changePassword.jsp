<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change Password - YantraX</title>

    <!-- Bootstrap 5 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"/>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    
    <script src="javascript/main.js"></script>

    <!-- Internal Styling matching Nord Soft Pastel Theme -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

        /* ==========================================================================
           COLOR SCHEME & BASE VARIABLES
           ========================================================================== */
        :root {
            --color-primary: #5E81AC;        /* Nord Soft Pastel Blue */
            --color-primary-hover: #6C8EBF;  /* Hover Soft Blue Highlight */
            --color-secondary: #88C0D0;      /* Soft Sky Accent */
            
            --color-grey-dark: #2B303A;       /* Slate Dark Grey */
            --bg-main: #F4F6F9;            
            --bg-card: #FFFFFF;            
            
            --text-primary: #2E3440;      
            --text-muted: #6C757D;        
            
            --border-color: #E2E8F0;
            --border-radius: 14px;
            --shadow-soft: 0 12px 35px rgba(0, 0, 0, 0.08);
            --transition-smooth: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
        }

        body {
            background-color: var(--bg-main);
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            flex-direction: column; /* Stack Navbar on top and content below */
        }

        /* Container to center the card below top navbar */
        .page-content-wrapper {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 20px;
        }

        /* Card Container */
        .password-card {
            background: var(--bg-card);
            width: 100%;
            max-width: 440px;
            padding: 40px 32px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-soft);
            border: 1px solid var(--border-color);
            position: relative;
            overflow: hidden;
        }

        /* Top Nord Blue Gradient Header Line */
        .password-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
        }

        /* Header Logo Section */
        .header-box {
            text-align: center;
            margin-bottom: 28px;
        }

        /* 3D Floating Security Shield Icon */
        .icon-3d-wrapper {
            width: 75px;
            height: 75px;
            margin: 0 auto 16px auto;
            background: linear-gradient(135deg, #5E81AC 0%, #88C0D0 100%);
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #FFFFFF;
            font-size: 2rem;
            box-shadow: 0 10px 20px rgba(94, 129, 172, 0.35);
            transform: perspective(500px) rotateX(10deg) rotateY(-5deg);
            transition: var(--transition-smooth);
        }

        .password-card:hover .icon-3d-wrapper {
            transform: perspective(500px) rotateX(0deg) rotateY(0deg) scale(1.03);
        }

        .header-box h4 {
            font-weight: 700;
            color: var(--text-primary);
            font-size: 1.35rem;
            margin-bottom: 4px;
        }

        .header-box p {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin: 0;
        }

        /* Form Inputs & Icons */
        .form-label {
            font-size: 0.82rem;
            font-weight: 600;
            color: var(--color-grey-dark);
            margin-bottom: 6px;
        }

        .input-group {
            position: relative;
            margin-bottom: 20px;
        }

        .input-group-text {
            background-color: #F8FAFC;
            border-color: var(--border-color);
            color: var(--color-primary);
            font-size: 1.1rem;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        .form-control {
            padding: 11px 14px;
            font-size: 0.9rem;
            border-color: var(--border-color);
            background-color: #F8FAFC;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            transition: var(--transition-smooth);
        }

        .form-control:focus {
            background-color: #FFFFFF;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 0.25rem rgba(94, 129, 172, 0.18);
        }

        /* Toggle Password View Eye Icon */
        .btn-toggle-eye {
            border: 1px solid var(--border-color);
            border-left: none;
            background: #F8FAFC;
            color: var(--text-muted);
            border-top-right-radius: 10px !important;
            border-bottom-right-radius: 10px !important;
            transition: var(--transition-smooth);
        }

        .btn-toggle-eye:hover {
            color: var(--color-primary);
            background: #FFFFFF;
        }

        /* Password Strength / Requirements text */
        .password-hint {
            font-size: 0.78rem;
            color: var(--text-muted);
            margin-top: -12px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        /* Action Buttons */
        .btn-submit {
            width: 100%;
            padding: 12px;
            background: var(--color-primary);
            color: #FFFFFF;
            border: none;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(94, 129, 172, 0.3);
            transition: var(--transition-smooth);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .btn-submit:hover {
            background: var(--color-primary-hover);
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(94, 129, 172, 0.4);
            color: #FFFFFF;
        }

        .btn-cancel {
            width: 100%;
            padding: 11px;
            background: transparent;
            color: var(--text-muted);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: 500;
            margin-top: 10px;
            text-align: center;
            text-decoration: none;
            display: block;
            transition: var(--transition-smooth);
        }

        .btn-cancel:hover {
            background: #F8FAFC;
            color: var(--text-primary);
        }
    </style>
</head>

<body>

    <!-- 1. INCLUDED NAVBAR AT THE TOP -->
    <%@ include file="navbar.jsp" %>

    <!-- 2. MAIN CONTENT AREA -->
    <div class="page-content-wrapper">
        <div class="password-card">
            
            <!-- Header & 3D Security Icon -->
            <div class="header-box">
                <div class="icon-3d-wrapper">
                    <i class="bi bi-shield-lock-fill"></i>
                </div>
                <h4>Change Password</h4>
                <p>Update your credentials to keep your account secure</p>
            </div>

            <form id="changePasswordForm" onsubmit="event.preventDefault(); changePassword();">
                
                <!-- Old Password Field -->
                <div class="mb-3">
                    <label for="oldPassword" class="form-label">Current Password</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
                        <input type="password" class="form-control" id="oldPassword" placeholder="Enter current password" required>
                        <button class="btn btn-toggle-eye" type="button" onclick="toggleVisibility('oldPassword', this)">
                            <i class="bi bi-eye-slash-fill"></i>
                        </button>
                    </div>
                </div>

                <!-- New Password Field -->
                <div class="mb-3">
                    <label for="newPassword" class="form-label">New Password</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
                        <input type="password" class="form-control" id="newPassword" placeholder="Enter new password" required>
                        <button class="btn btn-toggle-eye" type="button" onclick="toggleVisibility('newPassword', this)">
                            <i class="bi bi-eye-slash-fill"></i>
                        </button>
                    </div>
                </div>

                <!-- Confirm Password Field -->
                <div class="mb-2">
                    <label for="confirmPassword" class="form-label">Confirm New Password</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-check-circle-fill"></i></span>
                        <input type="password" class="form-control" id="confirmPassword" placeholder="Re-enter new password" required>
                        <button class="btn btn-toggle-eye" type="button" onclick="toggleVisibility('confirmPassword', this)">
                            <i class="bi bi-eye-slash-fill"></i>
                        </button>
                    </div>
                </div>

                <div class="password-hint">
                    <i class="bi bi-info-circle"></i>
                    <span>Password must be at least 6 characters long.</span>
                </div>

                <!-- Buttons -->
                <button type="submit" class="btn-submit">
                    <i class="bi bi-arrow-repeat"></i> Update Password
                </button>
                
                <a href="admin_home.jsp" class="btn-cancel">Cancel</a>
            </form>

        </div>
    </div>

    <!-- Password Visibility Toggle Script -->
    <script src="javascript/apiconfig.js"></script>
    <script>
        function toggleVisibility(inputId, btn) {
            const input = document.getElementById(inputId);
            const icon = btn.querySelector('i');
            
            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove('bi-eye-slash-fill');
                icon.classList.add('bi-eye-fill');
            } else {
                input.type = "password";
                icon.classList.remove('bi-eye-fill');
                icon.classList.add('bi-eye-slash-fill');
            }
        }
    </script>
</body>
</html>
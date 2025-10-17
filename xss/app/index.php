<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paws & Play - Dog Community</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .vulnerable-section {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        input, textarea {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background: #764ba2;
        }
        .dog-profile {
            border: 1px solid #ddd;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
        }
        .search-result {
            background: #f8f9fa;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🐕 Paws & Play - Dog Community</h1>
            <p>Join our community of dog lovers! Share, search, and connect.</p>
        </header>

        <!-- VULNERABLE SEARCH FUNCTIONALITY -->
        <div class="vulnerable-section">
            <h2>🔍 Search Dog Breeds</h2>
            <form method="GET">
                <input type="text" name="search" placeholder="Enter breed name..." 
                       value="<?php echo isset($_GET['search']) ? $_GET['search'] : ''; ?>">
                <button type="submit">Search</button>
            </form>
            
            <?php
            if (isset($_GET['search'])) {
                echo "<div class='search-result'>";
                echo "<h3>Search results for: " . $_GET['search'] . "</h3>";
                echo "<p>No results found for your search.</p>";
                echo "</div>";
            }
            ?>
        </div>

        <!-- VULNERABLE DOG PROFILE SYSTEM -->
        <div class="vulnerable-section">
            <h2>🐾 Create Dog Profile</h2>
            <form method="POST">
                <input type="text" name="dog_name" placeholder="Dog Name" required>
                <textarea name="dog_bio" placeholder="Tell us about your dog..." required></textarea>
                <input type="text" name="owner" placeholder="Owner Name">
                <button type="submit" name="create_profile">Create Profile</button>
            </form>

            <?php
            if (isset($_POST['create_profile'])) {
                $dog_name = $_POST['dog_name'];
                $dog_bio = $_POST['dog_bio'];
                $owner = $_POST['owner'];
                
                echo "<div class='dog-profile'>";
                echo "<h3>🐕 $dog_name</h3>";
                echo "<p><strong>Bio:</strong> $dog_bio</p>";
                echo "<p><strong>Owner:</strong> $owner</p>";
                echo "</div>";
                
                // Store in session for persistence (vulnerable)
                session_start();
                $_SESSION['last_profile'] = "<div class='dog-profile'>
                    <h3>🐕 $dog_name</h3>
                    <p><strong>Bio:</strong> $dog_bio</p>
                    <p><strong>Owner:</strong> $owner</p>
                </div>";
            }
            
            // Show last created profile
            session_start();
            if (isset($_SESSION['last_profile'])) {
                echo "<h3>Last Created Profile:</h3>";
                echo $_SESSION['last_profile'];
            }
            ?>
        </div>

        <!-- VULNERABLE COMMENT SYSTEM -->
        <div class="vulnerable-section">
            <h2>💬 Dog Community Comments</h2>
            <form method="POST">
                <input type="text" name="comment_author" placeholder="Your Name">
                <textarea name="comment_text" placeholder="Share your thoughts..." required></textarea>
                <button type="submit" name="add_comment">Post Comment</button>
            </form>

            <?php
            // Simple file-based comment storage (vulnerable)
            if (isset($_POST['add_comment'])) {
                $author = $_POST['comment_author'] ?: 'Anonymous';
                $comment = $_POST['comment_text'];
                $timestamp = date('Y-m-d H:i:s');
                
                $comment_html = "<div class='dog-profile'>
                    <p><strong>$author</strong> ($timestamp):</p>
                    <p>$comment</p>
                </div>";
                
                file_put_contents('comments.txt', $comment_html . PHP_EOL, FILE_APPEND);
            }
            
            // Display comments
            if (file_exists('comments.txt')) {
                echo "<h3>Recent Comments:</h3>";
                echo file_get_contents('comments.txt');
            }
            ?>
        </div>

        <!-- VULNERABLE DOG NAME DISPLAY -->
        <div class="vulnerable-section">
            <h2>🎯 Dog Name Generator</h2>
            <form method="GET">
                <input type="text" name="dog_type" placeholder="Enter dog type...">
                <button type="submit">Generate Name</button>
            </form>
            
            <?php
            if (isset($_GET['dog_type'])) {
                $dog_type = $_GET['dog_type'];
                echo "<div id='name-result'>";
                echo "<script>";
                echo "document.getElementById('name-result').innerHTML = ";
                echo "'<h3>Suggested name for $dog_type: ' + ";
                echo "['Buddy', 'Max', 'Charlie', 'Bella', 'Luna'][Math.floor(Math.random() * 5)] + ";
                echo "'</h3>';";
                echo "</script>";
                echo "</div>";
            }
            ?>
        </div>

        <!-- VULNERABLE URL PARAMETER DISPLAY -->
        <div class="vulnerable-section">
            <h2>📊 Dog Statistics</h2>
            <?php
            if (isset($_GET['stat_type'])) {
                echo "<div class='search-result'>";
                echo "Displaying statistics for: " . $_GET['stat_type'];
                echo "</div>";
            }
            ?>
            <p>
                <a href="?stat_type=popular_breeds">Popular Breeds</a> | 
                <a href="?stat_type=training_tips">Training Tips</a> | 
                <a href="?stat_type=health_stats">Health Statistics</a>
            </p>
        </div>
    </div>
</body>
</html>

7. Client-side Testing

Aim: To perform client-side security testing to identify, validate, and document Cross-Site
Scripting (XSS), unintended JavaScript execution, and HTML injection vulnerabilities in a web
application using authorized, lab-based tools, and to recommend appropriate mitigations.
Procedure:
Testing for Cross Site Scripting
Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected
into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web
application to send malicious code, generally in the form of a browser side script, to a different
end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a
web application uses input from a user within the output it generates without validating or
encoding it.
1. XSS DOM based attack
DOM Based XSS (or as it is called in some texts, “type-0 XSS”) is an XSS attack wherein the
attack payload is executed as a result of modifying the DOM “environment” in the victim’s
browser used by the original client side script, so that the client side code runs in an
“unexpected” manner. That is, the page itself (the HTTP response that is) does not change, but
the client side code contained in the page executes differently due to the malicious modifications
that have occurred in the DOM environment.

1. Open the url
http://localhost:8080/?search=%3CA%09OnMOUseOvER+=+(prompt)`
`%3Ev3dm0s in a browser
2. Move the mouse cursor over part of the page that shows the
search query to trigger the payload.

2. Reflected XSS Attacks
Reflected attacks are those where the injected script is reflected off the web server, such as in
an error message, search result, or any other response that includes some or all of the input
sent to the server as part of the request. Reflected attacks are delivered to victims via another
route, such as in an e-mail message, or on some other website. When a user is tricked into
clicking on a malicious link, submitting a specially crafted form, or even just browsing to a
malicious site, the injected code travels to the vulnerable web site, which reflects the attack
back to the user’s browser. The browser then executes the code because it came from a
“trusted” server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-I XSS
(the attack is carried out through a single request / response cycle).
1. Basic Alert:

<script>alert('Reflected XSS')</script>
Explanation: Script is reflected from search input and executed immediately.
2. Data Theft:
<script>alert('Page: '+document.title+' | URL: '+location.href)</script>
Explanation: Steals page information and displays it, demonstrating information leakage.
3. Stored XSS Attacks
Stored attacks are those where the injected script is permanently stored on the target servers,
such as in a database, in a message forum, visitor log, comment field, etc. The victim then
retrieves the malicious script from the server when it requests the stored information. Stored
XSS is also sometimes referred to as Persistent or Type-II XSS.
1. Keylogger:
<script>document.onkeypress=function(e){console.log('Key:',e.key)}</script>
Explanation: Logs all keyboard inputs to console, demonstrating keylogging capability.
2. Persistent Redirect:
<script>setTimeout(()=>window.location.href='http://google.com',5000)</script>
Explanation: Redirects all users to another site after 5 seconds, demonstrating persistent
redirection attack.

2. Testing for JavaScript Execution
1. Page Redirect:
<script>window.location.href='http://google.com'</script>
Explanation: Redirects user to another website, could be used for phishing.
2. Local Storage Access:
<script>alert('Storage: '+localStorage.length+' items')</script>
Explanation: Accesses browser's local storage, showing stored application data.

3. Testing for HTML Injection
Objective: Inject and render arbitrary HTML content
1. Basic Defacement:

<h1 style="color:red">SECURITY BREACH</h1>
Explanation: Injects a red heading that renders as actual HTML, demonstrating content
manipulation.

Conclusion
The experiment successfully demonstrated various client-side vulnerabilities, including
DOM-based, reflected, and stored XSS, as well as HTML and JavaScript injection, highlighting
the importance of proper input validation, safe DOM manipulation, and security controls to
protect web applications.

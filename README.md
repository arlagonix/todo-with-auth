# Todo App with Frontend, Backend Authorization and Storage

## User Requirements

### Login Screen

<table>
  <tr>
    <th align="left">As</th>
    <td>An unauthorized user</td>
  </tr>
  <tr>
    <th align="left">I want to</th>
    <td>Have my todo items accessibly only by me</td>
  </tr>
  <tr>
    <th align="left">In order to</th>
    <td>Avoid unwanted users from accessing my data</td>
  </tr>
</table>

<table>
  <tr>
    <th>Given</th>
    <th>When</th>
    <th>Then</th>
  </tr>
  
  <tr>
    <td>User is unauthorized</td>
    <td>User enters the login screen</td>
    <td>System displays the login screen</td>
  </tr>
  
  <tr>
    <td>User is authorized</td>
    <td>User enters the login screen</td>
    <td>System redirects user to the todo list screen</td>
  </tr>
  
  <tr>
    <td colspan="3">For brevity I further assume that user in unauthorized</td>
  </td>
  
  <tr>
    <td>-</td>
    <td>User enters <b>Username</b></td>
    <td>
      System validates it as following
      <ul>
        <li><b>Length:</b> 4-20 (exclusively)</li>
        <li><b>Required:</b> true</li>
      </ul>
      <br>
      When to display error messages:
      <ul>
        <li>When length is wrong</li>
        <li>When the field is empty (after being touched)</li>
      </ul>
    </td>
  </tr>
  
  <tr>
    <td>-</td>
    <td>User enters <b>Password</b></td>
    <td>
      System validates it as following
      <ul>
        <li><b>Length:</b> 8-128 (exclusively)</li>
        <li><b>Required:</b> true</li>
      </ul>
      <br>
      When to display error messages:
      <ul>
        <li>When length is wrong</li>
        <li>When the field is empty (after being touched)</li>
      </ul>
    </td>
  </tr>
  
  <tr>
    <td>
      Login, Password are valid
      <br>
      <b>AND</b>
      <br>
      Pair (Login, Password) is correct
    </td>
    <td>User inititates logging in</td>
    <td>System redirects user to the todo list screen</td>
  </tr>
  
  <tr>
    <td>
      User is unauthorized
      <br>
      <b>AND</b>
      <br>
      Login or Password is invalid
    </td>
    <td>-</td>
    <td>
      System disables possibility to initiate entering the system
      <br>
      (otherwise enables it)
    </td>
  </tr>
  
  <tr>
    <td>
      Login and Password are valid
      <br>
      <b>AND</b>
      <br>
      Pair (Login, Password) is incorrect
    </td>
    <td>User initiates logging in</td>
    <td>System displays error message</td>
  </tr>
  
  <tr>
    <td>-</td>
    <td>User initiates creating a new account</td>
    <td>System displays an account creation screen</td>
  </tr>
  
</table>

### Create Account Screen

<table>
  <tr>
    <th align="left">As</th>
    <td>An unauthorized user</td>
  </tr>
  <tr>
    <th align="left">I want to</th>
    <td>Create new accounts</td>
  </tr>
  <tr>
    <th align="left">In order to</th>
    <td>Save todo items on the server, limit access to the todo items</td>
  </tr>
</table>


Feature: Login Form Validation

  Scenario: Display "Username is required" error after clearing credentials and clicking login
    Given I am on the login page
    When I enter the username "HarryPotter" and password "harryPotter.123"
    And I clear the username field
    And I clear the password field
    And I click the login button
    Then I should see the error message "Username is required"

  Scenario: Display "Password is required" error after clearing password and clicking login
    Given I am on the login page
    When I enter the username "HarryPotter" and password "harryPotter.123"
    And I clear the password field
    And I click the login button
    Then I should see the error message "Password is required"

  Scenario: Successfully login with correct credentials and show the app logo
    Given I am on the login page
    When I enter the username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should see the app logo

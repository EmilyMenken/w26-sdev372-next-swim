describe("NextSwim E2E Flows", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173"); // Change port if different
  });

  it("Flow 1: Add a new resource and see it in the list", () => {
    // Go to Resources page
    cy.contains("Aquatic Resources").click();

    // Fill out the AddResource form
    cy.get("input[placeholder='Resource Title']").type("Test Video Resource");
    cy.get("select").select("Video");
    cy.get("input[type='number']").clear().type("2");
    cy.get("textarea").type("This is a test resource description.");
    cy.get("input[placeholder='URL (https://...)']").type("https://example.com");

    // Submit
    cy.contains("Add to NextSwim").click();

    // Check alert
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Resource added successfully");
    });

    // Ensure resource appears in list
    cy.contains("Level 2 Resources").click();
    cy.contains("Test Video Resource").should("exist");
    cy.contains("This is a test resource description.").should("exist");
  });

  it("Flow 2: Complete Swim Level Analysis quiz and see recommended resources", () => {
    cy.contains("Quiz").click();
    cy.contains("Swim Level Analysis").click();

    // Step 0
    cy.contains("Which best describes your swimming ability?").parent().contains("Intermediate").click();

    // Step 1
    cy.contains("How confident do you feel in the water?").parent().contains("Very confident").click();

    // Step 2
    cy.contains("Can you float on your front and back?").parent().contains("Both").click();

    // Step 3
    cy.contains("How far can you swim?").parent().contains("50+").click();

    // Step 4
    cy.contains("Do you know freestyle?").parent().contains("Yes").click();

    // Step 5
    cy.contains("Do you know backstroke?").parent().contains("Yes").click();

    // Step 6
    cy.contains("Do you know breaststroke?").parent().contains("Yes").click();

    // Step 7
    cy.contains("How long can you tread water?").parent().contains("1+ minute").click();

    // Check results page
    cy.contains("Your NextSwim Profile").should("exist");
    cy.contains("Recommended Resources").should("exist");

    // Check that at least one recommended resource is visible
    cy.get("ul li").should("have.length.greaterThan", 0);
  });

});
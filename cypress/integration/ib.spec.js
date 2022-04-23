/// <reference types="cypress" />

import { API_URL } from '../../src/style/consts';

describe("The IndexBrain", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080")
    })

    it("should have correct logo", () => {
        cy.get("h1").should("have.text", "IndexBrain")
    })

    it("should check for messages on start-up", () => {
        cy.intercept(`${API_URL}/message`, "Test Message").as("getMessage")

        cy.wait("@getMessage")
    })

    it("should clear results on start", () => {
        cy.get(".cy-search-results").children().should("have.length", 0)
    })

    it("should search correctly (enter)", () => {
        cy.get(".cy-select-location").type("AFG{enter}")
        cy.get(".cy-select-type").type("Names{enter}")
        cy.get(".cy-search").type("a{enter}")
        cy.get(".cy-search-results").children().should("have.length.above", 10) // arbitrary
    })

    it("should search correctly (button)", () => {
        cy.get(".cy-select-location").type("AFG{enter}")
        cy.get(".cy-select-type").type("Names{enter}")
        cy.get(".cy-search").type("a")
        cy.get(".cy-search-button").click()
        cy.get(".cy-search-results").children().should("have.length.above", 10) // arbitrary
    })

    it("should clear query correctly", () => {
        cy.get(".cy-search").type("test")
        cy.get(".cy-search-clear").click()
        cy.get(".cy-search").should("have.text", "")
    })
})

describe("Queries", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080")
    })

    it("test", () => {
        cy.get(".cy-select-location").type("AFG{enter}")
        cy.get(".cy-select-type").type("Places{enter}")
        cy.get(".cy-search").type("test{enter}")
    })
})
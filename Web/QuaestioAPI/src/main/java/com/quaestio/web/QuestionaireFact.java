package com.quaestio.web;

public class QuestionaireFact {
    private String description;
    private Boolean _default;
    private Boolean mandatory;

    public QuestionaireFact(String description, Boolean _default, Boolean mandatory) {
        this.description = description;
        this._default = _default;
        this.mandatory = mandatory;
    }

    public String getDescription() {
        return description;
    }

    public Boolean isDefault() {
        return _default;
    }

    public Boolean isMandatory() {
        return mandatory;
    }
}

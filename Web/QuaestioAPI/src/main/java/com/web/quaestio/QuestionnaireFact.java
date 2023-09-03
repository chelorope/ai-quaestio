package com.web.quaestio;

public class QuestionnaireFact {
    private String id;
    private String description;
    private Boolean _default;
    private Boolean mandatory;
    private Boolean value;

    public QuestionnaireFact(String id, String description, Boolean _default, Boolean mandatory, Boolean value) {
        this.id = id;
        this.description = description;
        this._default = _default;
        this.mandatory = mandatory;
        this.value = value;
    }

    public String getId() {
        return id;
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

    public Boolean getValue() {
        return value;
    }
}

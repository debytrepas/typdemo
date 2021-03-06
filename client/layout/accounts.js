
Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'firstName',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'lastName',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
    },  

    {
        fieldName: 'community',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'Community',
        inputType: 'radio',
        radioLayout: 'vertical',    // It can be 'inline' or 'vertical'
        data: [
           {                    // Array of radio options, all properties are required
            id: 1,                  // id suffix of the radio element
            label: 'Alumn',          // label for the radio element
            value: 'A'              // value of the radio element, this will be saved.
          }, 
             {
            id: 2,
            label: 'Falcuty',
            value: 'F',
            checked: 'checked'
          },
            {
            id: 3,
            label: 'Student',
            value: 'S',
            checked: 'checked'
          }
          ],
        visible: true
    }, 
    {
        fieldName: 'terms',
        fieldLabel: 'I accept the terms and conditions',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('You must accept the terms and conditions.');
                return false;
            }
        }
    }]
});


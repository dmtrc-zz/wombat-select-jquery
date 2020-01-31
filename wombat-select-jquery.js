(function( $ ) {
  $.fn.wombatSelect = function() {
    const body =    document.body;
    const select =  this[0];
    const options = select.options;

    //hide native select
    select.style.border = '0';
    select.style.clip = 'rect(0 0 0 0)';
    select.style.height = '1px';
    select.style.margin = '-1px';
    select.style.overflow = 'hidden';
    select.style.padding = '0';
    select.style.position = 'absolute';
    select.style.width = '1px';
    select.classList.add('wombat-select-native');

    //create custom SELECT element
    const customSelect = document.createElement('div');
    customSelect.classList.add('wombat-select');

    //create custom select VALUE element
    const customSelectValue = document.createElement('div');
    customSelectValue.classList.add('wombat-select-value');
    customSelectValue.textContent = options[0].value;

    //create custom select DROPDOWN element
    const customSelectDropdown = document.createElement('div');
    customSelectDropdown.classList.add('wombat-select-dropdown');

    //add VALUE element to SELECT element
    customSelect.appendChild(customSelectValue);

    //wrap native select with SELECT element
    select.parentNode.insertBefore(customSelect, select);
    customSelect.appendChild(select);

    //create CUSTOM OPTIONS
    const createCustomOption = optionVal => {
      const newOption = document.createElement('div');
      newOption.classList.add('wombat-select-option');
      newOption.textContent = optionVal;
      return newOption;
    }

    for (let i = 0; i < options.length; i++) {
      customSelectDropdown.appendChild(createCustomOption(options[i].value))
    }

    //select an option
    const selectCustomOption = () => {
      const customOptions = document.querySelectorAll('.wombat-select-option');
      const handleCustomOptionClick = e => {
        customSelectValue.textContent = e.target.textContent;
        select.value = e.target.textContent;
      }

      for (let i = 0; i < customOptions.length; i++ ) {
        customOptions[i].addEventListener('click', handleCustomOptionClick)
      }
    }

    //removing the DROPDOWN
    const removeCustomSelectDropdown = () => {
      customSelect.classList.remove('custom-select--open');
      body.removeChild(customSelectDropdown);
    }

    //add DROPDOWN element styles
    const customSelectDropdownStyles = () => {
      const boundingRect = customSelectValue.getBoundingClientRect();
      const dropdownStyle = customSelectDropdown.style;

      dropdownStyle.position = 'absolute';
      dropdownStyle.width = `${customSelectValue.offsetWidth}px`;
      dropdownStyle.left = `${boundingRect.x}px`;
      dropdownStyle.top = `${boundingRect.y + boundingRect.height}px`;
    }

    //add DROPDOWN element to Body element when VALUE is clicked
    customSelectValue.addEventListener('click', e => {
      e.stopPropagation();
    if (body.contains(customSelectDropdown)) {
      removeCustomSelectDropdown();
    } else {
      //apply dropdown styles
      customSelectDropdownStyles();

      //add dropdown element to the page
      customSelect.classList.add('custom-select--open');
      body.appendChild(customSelectDropdown);

      //select options functionality
      selectCustomOption();
    }
  })

    //remove dropdown on click outside
    window.addEventListener('click', () => {
      if (body.contains(customSelectDropdown)) {
      removeCustomSelectDropdown();
    }
  })

    //remove dropdown on window resize
    window.addEventListener('resize', () => {
      if (body.contains(customSelectDropdown)) {
      removeCustomSelectDropdown();
    }
  })
  }
})( jQuery );
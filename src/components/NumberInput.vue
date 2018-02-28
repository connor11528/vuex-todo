<template>
  <div class="vnis" >
    <button @click.prevent="decreaseNumber" :class="buttonClass">-</button>
    <input
        type="number"
        :value="numericValue"
        @keypress="validateInput"
        @input="numericValue = parseInt($event.target.value)"
        :class="inputClass"
        :min="min"
        :max="max"
        debounce="500"
    />
    <button @click.prevent="increaseNumber" :class="buttonClass">+</button>
  </div>
</template>

<script>
export default {
  name: "NumberInput",

  data: function() {
    return {
      numericValue: this.value
    };
  },

  props: {
    value: {
      type: Number,
      default: 1
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 100,
      type: Number
    },
    step: {
      default: 1,
      type: Number
    },
    inputClass: {
      default: "input",
      type: String
    },
    buttonClass: {
      default: "button",
      type: String
    },
    integerOnly: {
      default: false,
      type: Boolean
    }
  },

  methods: {
    increaseNumber() {
      this.numericValue += this.step;
    },

    decreaseNumber() {
      this.numericValue -= this.step;
    },

    isInteger(evt) {
      evt = evt ? evt : window.event;
      let key = evt.keyCode || evt.which;
      key = String.fromCharCode(key);
      const regex = /[0-9]/;

      if (!regex.test(key)) {
        evt.returnValue = false;
        if (evt.preventDefault) evt.preventDefault();
      }
    },

    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;

      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    validateInput(evt) {
      if (this.integerOnly === true) {
        this.isInteger(evt);
      } else {
        this.isNumber(evt);
      }
    }
  },

  watch: {
    numericValue: function(val, oldVal) {
      if (val <= this.min) {
        this.numericValue = parseInt(this.min);
      }

      if (val >= this.max) {
        this.numericValue = parseInt(this.max);
      }

      if (val <= this.max && val >= this.min) {
        this.$emit("input", val, oldVal);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
*,
*::after,
*::before {
  box-sizing: border-box;
}
</style>

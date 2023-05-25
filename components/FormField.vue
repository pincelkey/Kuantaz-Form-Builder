<template>
  <v-card class="c-card-field pa-3">
    <p class="mb-4">
      {{ question }}
    </p>

    <v-text-field
      v-if="type === 'INPUT'"
      v-model="value"
      :rules="[rules.selectRequired]"
      color="secondary"
      label="Respuesta"
      hide-details="auto"
    />

    <v-select
      v-else-if="type === 'SELECT'"
      v-model="value"
      :items="items"
      item-title="value"
      item-value="value"
      :rules="[rules.inputRequired]"
      color="secondary"
      label="Seleccionar opciones"
      hide-details="auto"
    />

    <template v-else-if="type === 'CHECKBOX'">
      <v-checkbox
        v-for="(item, iitem) of items"
        :key="`item-checkbox-${iitem}`"
        v-model="value"
        :rules="[rules.checkboxRequired]"
        color="secondary"
        :value="item"
        :label="item"
        hide-details="auto"
      />
    </template>
  </v-card>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    question: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default() { return []; },
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      localValue: '',

      rules: {
        inputRequired: (value) => !!value || 'El campo no debe estar vacío',
        selectRequired: (value) => !!value || 'Debe seleccionar una opción',
        checkboxRequired: (value) => !!value || 'Debe marcar una alternativa',
      },
    };
  },
  computed: {
    value: {
      set(newValue) {
        this.localValue = newValue;

        return this.$emit('update:modelValue', newValue);
      },
      get() {
        return this.localValue;
      },
    },
  },
  mounted() {
    this.localValue = this.modelValue;
  },
};
</script>

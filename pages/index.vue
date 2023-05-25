<template>
  <section class="c-home">
    <Header />
    <v-container>
      <div v-if="form.isLoading">
        <v-card class="pa-4">
          <v-progress-linear
            indeterminate
            color="secondary"
            class="mb-3"
          />

          <p class="text-center">
            Cargando formulario
          </p>
        </v-card>
      </div>
      <v-form
        v-else-if="form.data"
        @submit.prevent="handleSubmit($event)"
      >
        <h1 class="text-center mb-2 font-weight-black">
          {{ form.data.name }}
        </h1>
        <p class="text-center mb-8">
          {{ form.data.descripcion }}
        </p>

        <v-row>
          <v-col
            v-for="(field, ifield) of form.data.form"
            :key="`field-${ifield}`"
            cols="12"
          >
            <FormField
              v-model="field.response"
              :type="field.type"
              :question="field.question"
              :items="field.items"
            />
          </v-col>
          <v-col cols="12">
            <div class="d-flex justify-end">
              <v-btn type="submit" color="secondary">
                Confirmar
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
      <v-alert
        v-else
        type="error"
        title="Error al cargar el formulario"
        text="Lo sentimos, hubo problema al cargar el formulario. Intentelo nuevamente o consulta al area de soporte support@kuantaz.co"
        variant="tonal"
      />
    </v-container>

    <v-snackbar
      v-model="form.isError"
      multi-line
      color="red"
      :timeout="3000"
    >
      Error al validar el formulario, revise los campos nuevamente
    </v-snackbar>

    <v-dialog
      v-model="form.showResults"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <v-card>
        <v-toolbar
          color="secondary"
          title="Resultados"
        />
        <v-card-text>
          <v-list v-if="form.data" lines="two">
            <v-list-item
              v-for="(item, iitem) in form.data.form"
              :key="`item-field-result-${iitem}`"
              :title="`${iitem + 1}. ${item.question}`"
              :subtitle="item.response"
            />
          </v-list>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            @click="form.showResults = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
useHead({
  title: 'Formulario',
});
</script>

<script>
export default {
  data() {
    return {
      form: {
        isLoading: false,
        isError: false,
        showResults: false,

        data: null,
      },
    };
  },
  computed: {
    config() {
      return useRuntimeConfig();
    },
  },
  created() {
    this.getFormData();
  },
  methods: {
    async handleSubmit(e) {
      const results = await e;

      if (results.valid) {
        this.form.showResults = true;
      } else {
        this.form.isError = true;
      }
    },
    getFormData() {
      this.form.isLoading = true;

      fetch(this.config.public.kuantazApi)
        .then((response) => {
          if (response.status === 200 || response.status < 300) {
            return response.json();
          }

          throw response;
        })
        .then((response) => {
          if (response) {
            this.form.data = response.formulario;
          }
        })
        .catch(() => {
          this.form.isError = true;
        })
        .finally(() => {
          this.form.isLoading = false;
        });
    },
  },
};
</script>

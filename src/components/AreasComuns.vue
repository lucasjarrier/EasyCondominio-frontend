<template>
  <div>
    <b-container class="bv-example-row">
      <b-row v-if="listaAreas.length">
        <div v-for="item in listaAreas" :key="item.id">
          <b-col>
            <b-card
              :title="item.name"
              :img-src="
                item.photo != null
                  ? item.photo
                  : 'https://rafaturis.com.br/wp-content/uploads/2014/01/default-placeholder.png'
              "
              img-alt="Image"
              img-top
              style="width: 15rem"
              class="mb-2"
            >
              <b-card-text>
                {{ item.description }}
              </b-card-text>
              <b-button href="#" variant="primary" @click="handleSelect"
                >Exibir Detalhes</b-button
              >
            </b-card>
          </b-col>
        </div>
      </b-row>
      <b-row v-else> Não existem áreas comuns cadastradas! </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "AreasComuns",
  data() {
    return {
      listaAreas: [
        {
          id: 23,
          name: "Piscina",
          photo: null,
          description: "É uma piscina muito maravilhosamente gelada.",
        },
        {
          id: 23,
          name: "Academia",
          photo: null,
          description: "É uma Academia muito maravilhosamente Bonita.",
        },
        {
          id: 23,
          name: "Quadra Esportiva",
          photo: null,
          description: "É uma Quadra muito maravilhosamente Arquitetada.",
        },
      ],
    };
  },
  methods: {
    handleSelect() {
      console.log(this.listaAreas.length);
    },
  },
};
</script>

<style scoped></style>

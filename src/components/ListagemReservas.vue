<template>
  <div>
    <b-table :fields="fields" :items="items">
      <!-- A custom formatted data column cell -->
      <template #cell(name)="data">
        {{ data.value.first }} {{ data.value.last }}
      </template>

      <!-- A custom formatted header cell for field 'name' -->
      <template #head(name)="data">
        <span class="text-info">{{ data.label.toUpperCase() }}</span>
      </template>

      <!-- A custom formatted footer cell for field 'name' -->
      <template #foot(name)="data">
        <span class="text-danger">{{ data.label }}</span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template #foot()="data">
        <i>{{ data.label }}</i>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      fields: [
        // A column that needs custom formatting
        { key: "name", label: "Morador" },
        { key: "apt", label: "Apartamento" },
        { key: "hour", label: "Horário" },
      ],
      items: [
        {
          name: { first: "Maria", last: "Eduarda" },
          apt: "702-A",
          hour: "18:00 - 19:00",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
</style>

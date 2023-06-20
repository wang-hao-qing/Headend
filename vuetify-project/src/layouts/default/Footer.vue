<template>
    <div>
                 <!-- 底边栏 -->
  <v-bottom-navigation :elevation="24" mode="shift">
    <v-btn value="recent">
      <v-icon>mdi-history</v-icon>

      Recent
    </v-btn>

    <v-btn value="favorites">
      <v-icon>mdi-heart</v-icon>

      Favorites
    </v-btn>

    <v-btn value="nearby">
      <v-icon>mdi-map-marker</v-icon>

      Nearby
    </v-btn>
  </v-bottom-navigation>
    </div>
</template>
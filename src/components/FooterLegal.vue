<template>
  <Card>
    <template #content>
      <div>
        <p>
          EDH Deck Check uses combo data from
          <a href="https://www.commanderspellbook.com/">Commander Spellbook</a>
          (<a
            href="https://github.com/Commander-Spellbook/website-v2/blob/main/LICENSE"
            >license</a
          >). This data can be found on their public
          <a href="https://backend.commanderspellbook.com/">Api</a>. Card images
          are provided by <a href="https://scryfall.com/">Scryfall</a>, in
          accordance to the
          <a href="https://company.wizards.com/en/legal/fancontentpolicy"
            >Wizards of the Coast's Fan Content Policy</a
          >.
        </p>
        <p>
          EDH Deck Check is unofficial and non-endorsed (by Commander Spellbook,
          Scryfall and Wizards) Fan Content permitted under Wizard's
          <a href="https://company.wizards.com/en/legal/fancontentpolicy"
            >Fan Content Policy</a
          >. Some content used is property of Wizards of the Coast.<br /><br />
        </p>
        <p>
          The source for EDH Deck Check can be found on
          <a href="https://github.com/BrettOrmsby/edh-deck-check-v2">Github</a>.
        </p>
        <p>
          All other content © Brett Ormsby 2022-{{ new Date().getFullYear() }}
        </p>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import Card from "primevue/card";
</script>

<style scoped>
.p-card {
  width: 100%;
  margin-top: var(--space-large);
}
a {
  filter: saturate(50%);
}
p {
  max-width: 60ch;
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 auto;
}
</style>

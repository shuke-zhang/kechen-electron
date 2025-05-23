<script setup lang="ts">
import { getCodeImg } from '@/api/test';

import { logger } from '@shuke~/logger';

const sss  =ref(0);

logger.info('logger.info');
logger.warn('logger.warn');
logger.error('logger.error');
logger.success('logger.success');
onMounted(()=>{
    sss.value = 1;
    getCodeImg().then((res) => {
        console.log(res.msg);
    });
});
</script>

<template>
  <div>
    sss:{{sss}}
  </div>
</template>

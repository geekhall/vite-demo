import type { App } from "vue";
import { ElButton } from 'element-plus'

const components = [ElButton];

export function setupElem(app: App<Element>): void {
    components.forEach((component: any) => {
      app.use(component);
    });
  }

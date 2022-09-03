Curveball Azure Functions handler
=================================

Azure Function bindings for Curveball. Go 'serverless' with [Curveball][1].

Installation
------------

    npm install @curveball/azure-function @curveball/kernel


Getting started
---------------

Get started with your Azure function as you normally would,
the easiest is to start with the `http-trigger` template.

After this, your `index.ts` should look a little like this:

```typescript
import { Application } from '@curveball/kernel';
import { handler } from '@curveball/azure-function'

const app = new Application();
app.use( ctx => {
  ctx.response.body = 'hello world';
});

export default handler(app);

API
---

...

[1]: https://github.com/curveball/

import { SystemController } from '../common/system-decorators/system-application.decorator';

@SystemController('users')
export class SystemUserController {
  create() {
    return 'There is a resource being created here';
  }

  update() {
    return 'There is an update performed here';
  }

  delete() {}

  deactivate() {}
}

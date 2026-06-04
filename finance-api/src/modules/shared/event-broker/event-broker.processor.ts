import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bullmq';

@Injectable()
@Processor('events')
export class EventBroker extends WorkerHost {
  constructor(private readonly eventEmitter: EventEmitter2) {
    super();
  }

  async process(job: Job): Promise<void> {
    this.eventEmitter.emit(job.name, job.data);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Event ${job.name} processed successfully`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    console.error(`Event ${job.name} failed: ${error.message}`);
  }
}

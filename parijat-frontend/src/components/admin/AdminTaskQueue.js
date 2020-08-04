import { h } from 'preact';
import { BHUPI_ENDPOINT } from '../../api';

function AdminTask() {
  return (
    <div>
      <h4>Long Running Tasks</h4>
      <p>Here you can monitor long running server tasks. This feature is not
      implemented yet. Meanwhile use <a target="_blank" href={`${BHUPI_ENDPOINT}admin/queues`}>bull-board </a>
      for task monitoring.
      </p>
    </div>
  );
}

export default AdminTask;

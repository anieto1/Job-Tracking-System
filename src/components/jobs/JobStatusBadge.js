import React from 'react';

function JobStatusBadge({ status }) {
  const getBadgeClass = () => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'badge badge-applied';
      case 'interviewing':
        return 'badge badge-interviewing';
      case 'offer':
        return 'badge badge-offer';
      case 'rejected':
        return 'badge badge-rejected';
      default:
        return 'badge';
    }
  };

  return <span className={getBadgeClass()}>{status}</span>;
}

export default JobStatusBadge; 
import React from 'react';
import {Link} from 'react-router-dom';
import './Breadcrumb.css';

/**
 * Reusable Breadcrumb component
 *
 * @param {Array} items - Array of breadcrumb items
 *   Each item: { label: string, path?: string, isCurrent?: boolean }
 * @example
 * <Breadcrumb
 *   items={[
 *     { label: 'Ranky', path: '/' },
 *     { label: 'My Server', path: '/guilds?guildId=123' },
 *     { label: 'SoloQ Diamond', isCurrent: true }
 *   ]}
 * />
 */
export default function Breadcrumb({items = []}) {
  return (
      <nav className="breadcrumb" aria-label="breadcrumb">
        <ol className="breadcrumb-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const key = `${item.label}-${index}`;

            return (
                <li key={key} className="breadcrumb-item">
                  {item.path && !item.isCurrent ? (
                      <Link to={item.path} className="breadcrumb-link">
                        {item.label}
                      </Link>
                  ) : (
                      <span className={item.isCurrent ? 'breadcrumb-current'
                          : ''}>
                        {item.label}
                      </span>
                  )}
                  {!isLast && <span className="breadcrumb-separator">/</span>}
                </li>
            );
          })}
        </ol>
      </nav>
  );
}


import React from 'react';
import PropTypes from 'prop-types';

const TIER_ICON_PATHS = {
  CHALLENGER: '/assets/ranks/challenger.png',
  GRANDMASTER: '/assets/ranks/grandmaster.png',
  MASTER: '/assets/ranks/master.png',
  DIAMOND: '/assets/ranks/diamond.png',
  EMERALD: '/assets/ranks/emerald.png',
  PLATINUM: '/assets/ranks/platinum.png',
  GOLD: '/assets/ranks/gold.png',
  SILVER: '/assets/ranks/silver.png',
  BRONZE: '/assets/ranks/bronze.png',
  IRON: '/assets/ranks/iron.png',
  UNRANKED: '/assets/ranks/unranked.webp'
};

export default function RankTierIcon({tier = 'UNRANKED'}) {
  const normalizedTierInput = typeof tier === 'string'
      ? tier.trim().toUpperCase() : 'UNRANKED';
  const normalizedTier = TIER_ICON_PATHS[normalizedTierInput]
      ? normalizedTierInput
      : 'UNRANKED';
  const iconSrc = TIER_ICON_PATHS[normalizedTier];

  return (
      <span
          className="rank-tier-icon"
          title={normalizedTier}
          aria-label={normalizedTier}
      >
        <img
            src={iconSrc}
            alt={`${normalizedTier} icon`}
            loading="lazy"
            onError={(event) => {
              if (event.currentTarget.src.includes(
                  '/assets/ranks/unranked.webp')) {
                return;
              }
              event.currentTarget.src = '/assets/ranks/unranked.webp';
            }}
        />
    </span>
  );
}

RankTierIcon.propTypes = {
  tier: PropTypes.string
};



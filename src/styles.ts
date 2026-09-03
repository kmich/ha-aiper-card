import { css } from "lit";

/** Styles shared by both cards. Kept token-driven so it tracks the active HA theme. */
export const sharedStyles = css`
  :host {
    --aiper-gap: 12px;
    --aiper-radius: var(--ha-card-border-radius, 12px);
  }
  ha-card {
    overflow: hidden;
    padding: 0;
  }
  .header {
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 16px;
    gap: 12px;
    background: var(--aiper-header-bg, var(--card-background-color));
  }
  .header.has-image {
    min-height: 96px;
  }
  .header img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.28;
    pointer-events: none;
  }
  .title {
    position: relative;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.2;
  }
  .subtitle {
    position: relative;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }
  .body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: var(--aiper-gap);
  }
  .row {
    display: flex;
    align-items: center;
    gap: var(--aiper-gap);
  }
  .row.wrap {
    flex-wrap: wrap;
  }
  .spacer {
    flex: 1;
  }
  .statusline {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .status-icon {
    --mdc-icon-size: 34px;
    flex: 0 0 auto;
  }
  .status-icon.active {
    animation: aiper-pulse 1.8s ease-in-out infinite;
  }
  @keyframes aiper-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.45;
    }
  }
  .status-text {
    font-size: 1.05rem;
    font-weight: 500;
  }
  .battery {
    display: flex;
    align-items: center;
    gap: 6px;
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
  }
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 0.78rem;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
  }
  .pill.on {
    background: color-mix(in srgb, var(--info-color, #039be5) 22%, transparent);
    color: var(--primary-text-color);
  }
  .pill.warn {
    background: color-mix(in srgb, var(--error-color, #db4437) 22%, transparent);
    color: var(--primary-text-color);
  }
  .pill ha-icon {
    --mdc-icon-size: 15px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-size: 0.85rem;
    cursor: pointer;
    user-select: none;
  }
  .chip[disabled] {
    opacity: 0.5;
    cursor: default;
  }
  .chip.selected {
    border-color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 16%, transparent);
  }
  .chip ha-icon {
    --mdc-icon-size: 17px;
  }
  .label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--secondary-text-color);
  }
  .wear {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1 1 140px;
  }
  .wear .bar {
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color);
    overflow: hidden;
  }
  .wear .bar > span {
    display: block;
    height: 100%;
    background: var(--primary-color);
  }
  .wear .bar.low > span {
    background: var(--error-color, #db4437);
  }
  .footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-top: 1px solid var(--divider-color);
    color: var(--secondary-text-color);
    font-size: 0.78rem;
  }
  .footer ha-icon-button {
    --mdc-icon-button-size: 36px;
    --mdc-icon-size: 20px;
  }
  .alert {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--error-color, #db4437) 16%, transparent);
    color: var(--primary-text-color);
    font-size: 0.85rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    gap: var(--aiper-gap);
  }
  .gauge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
  }
  .gauge .val {
    font-size: 1.1rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .gauge .unit {
    font-size: 0.7rem;
    color: var(--secondary-text-color);
  }
  .gauge svg {
    width: 76px;
    height: 46px;
  }
  .warning-banner {
    margin: 0 16px 12px;
  }
  .meta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
  .meta ha-icon {
    --mdc-icon-size: 16px;
  }
  .unavailable {
    padding: 24px 16px;
    text-align: center;
    color: var(--secondary-text-color);
  }
`;

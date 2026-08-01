import React, { useState, useEffect, useRef } from "react";

import {
  EBodyPageType,
  EBodyPageVerticalMargin,
  ELightBoxSize,
  LightBox,
  Page,
} from "@sberbusiness/triplex-next";

import styles from "./DetailsLayout.module.less";

export interface DetailsLayoutProps {
  isOpen: boolean;
  isLoading?: boolean;
  isOverlayOpen?: boolean;
  onClose: () => void;
  className?: string;

  headerSlot?: React.ReactNode;
  contentSlot?: React.ReactNode;
  statusTrackerSlot?: React.ReactNode;
  errorSlot?: React.ReactNode;
  dialogsSlot?: React.ReactNode;
}

export const DetailsLayout: React.FC<DetailsLayoutProps> = ({
  isOpen,
  isLoading = false,
  isOverlayOpen = false,
  onClose,
  className,
  headerSlot,
  contentSlot,
  statusTrackerSlot,
  errorSlot,
  dialogsSlot,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(140);

  useEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return;

    const headerEl = pageEl.firstElementChild;
    if (!headerEl) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.target.getBoundingClientRect().height;
        if (height > 0) {
          setHeaderHeight(height);
        }
      }
    });

    resizeObserver.observe(headerEl);

    const initialRect = headerEl.getBoundingClientRect();
    if (initialRect.height > 0) {
      setHeaderHeight(initialRect.height);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <LightBox
      size={ELightBoxSize.MD}
      isLoading={isLoading}
      isTopOverlayOpened={isOverlayOpen}
    >
      <LightBox.Content>
        {dialogsSlot}
        <Page
          ref={pageRef}
          className={`${styles.detailsPageContainer} ${className || ""}`}
          style={{ '--page-header-height': `${headerHeight}px` } as React.CSSProperties}
        >
          {headerSlot}

          <Page.Body
            type={EBodyPageType.SECOND}
            verticalMargin={EBodyPageVerticalMargin.LARGE}
          >
            {errorSlot ? (
              <div className={styles.detailsLayoutErrorWrapper}>
                {errorSlot}
              </div>
            ) : (
              <div className={styles.detailBodyGrid}>
                <div className={styles.detailBodyLeft}>{contentSlot}</div>
                {statusTrackerSlot && (
                  <div className={styles.detailBodyRight}>{statusTrackerSlot}</div>
                )}
              </div>
            )}
          </Page.Body>
        </Page>
      </LightBox.Content>
      <LightBox.Controls>
        <LightBox.Controls.Close onClick={onClose} />
      </LightBox.Controls>
    </LightBox>
  );
};


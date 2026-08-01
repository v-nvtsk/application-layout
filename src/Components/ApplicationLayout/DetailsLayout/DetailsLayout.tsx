import React from "react";

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
  if (!isOpen) return null;

  return (
    <LightBox
      size={ELightBoxSize.MD}
      isLoading={isLoading}
      isTopOverlayOpened={isOverlayOpen}
    >
      <LightBox.Content>
        {dialogsSlot}
        <Page className={`${styles.detailsPageContainer} ${className || ""}`}>
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

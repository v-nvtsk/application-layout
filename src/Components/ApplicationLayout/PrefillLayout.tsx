import React from 'react';
import styles from './PrefillLayout.module.less';
import {
  LightBox,
  Page,
  ELightBoxSize,
  EBodyPageType,
  EBodyPageVerticalMargin,
} from '@sberbusiness/triplex-next';

export interface PrefillLayoutProps {
  isOpen: boolean;
  isLoading?: boolean;
  isOverlayOpen?: boolean;
  onClose: () => void;
  className?: string;

  headerSlot?: React.ReactNode;
  contentSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  errorSlot?: React.ReactNode;
  dialogsSlot?: React.ReactNode;
}

export const PrefillLayout: React.FC<PrefillLayoutProps> = ({
  isOpen,
  isLoading = false,
  isOverlayOpen = false,
  onClose,
  className,
  headerSlot,
  contentSlot,
  footerSlot,
  errorSlot,
  dialogsSlot,
}) => {
  if (!isOpen) return null;

  return (
    <LightBox size={ELightBoxSize.MD} isLoading={isLoading} isTopOverlayOpened={isOverlayOpen}>
      <LightBox.Content>
        {dialogsSlot}
        <Page className={`${styles.prefillPageContainer} ${className || ''}`}>
          {headerSlot}

          <Page.Body
            type={EBodyPageType.SECOND}
            verticalMargin={EBodyPageVerticalMargin.LARGE}
          >
            {errorSlot ? (
              <div className={styles.prefillLayoutErrorWrapper}>
                {errorSlot}
              </div>
            ) : (
              <div className={styles.prefillBodyContent}>
                {contentSlot}
              </div>
            )}
          </Page.Body>

          {!errorSlot && footerSlot}
        </Page>
      </LightBox.Content>
      <LightBox.Controls>
        <LightBox.Controls.Close onClick={onClose} />
      </LightBox.Controls>
    </LightBox>
  );
};

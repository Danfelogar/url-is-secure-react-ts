import { useEffect, useState } from 'react';
import { useBoundStore } from '../store';
import { urlScanApi } from '../api';
interface URLScanResult {
  detection: {
    harmless: number;
    malicious: number;
    suspicious: number;
    timeout: number;
    undetected: number;
  };
  status: string;
  url_description: string;
}

export const useManagementURL = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentTabUrl, setCurrentTabUrl] = useState<string | undefined>(
    undefined
  );
  const [urlToConfirm, setUrlToConfirm] = useState<string | undefined>(
    undefined
  );

  const {
    allowScanningUrls,
    sessionTimeCounter,
    clicksWithCounter,
    clicksWithoutCounter,
    maliciousCounter,
    suspiciousCounter,
    harmlessCounter,
    incrementSessionTimeCounter,
    incrementClicksWithCounter,
    incrementClicksWithoutCounter,
    incrementMaliciousCounter,
    incrementHarmlessCounter,
    incrementSuspiciousCounter,
  } = useBoundStore();

  const updateActiveTabUrl = () => {
    chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTab = tabs[0];
        setCurrentTabUrl(activeTab.url);
        const cleanUrl = activeTab?.url?.replace(/^https?:\/\//, '');

        urlScanApi
          .post(
            '/api/scan-url/',
            { original_url: cleanUrl },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(({ data }) => {
            const res = data as URLScanResult;
            incrementMaliciousCounter(res.detection.malicious);
            incrementSuspiciousCounter(res.detection.suspicious);
            incrementHarmlessCounter(res.detection.harmless);
            console.log('URL de la pestaña activa:', activeTab.url);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  };

  // Function to count the number of open tabs
  const countOpenTabs = () => {
    if (allowScanningUrls) {
      incrementClicksWithCounter();
    } else {
      incrementClicksWithoutCounter();
    }
  };

  useEffect(() => {
    if (allowScanningUrls) {
      // Initialize the URL of the active tab
      updateActiveTabUrl();

      // Adding event listeners for tab updates and activations
      const handleTabActivated = () => {
        updateActiveTabUrl();
        countOpenTabs(); // Count clicks when the tab is activated
      };

      const handleTabUpdated = (
        tabId: number,
        changeInfo: chrome.tabs.TabChangeInfo
      ) => {
        console.log({ tabId, changeInfo });
        if (changeInfo.status === 'complete') {
          countOpenTabs(); // Count clicks when the tab is updated
        }
      };

      chrome?.tabs?.onActivated?.addListener(handleTabActivated);
      chrome?.tabs?.onUpdated?.addListener(handleTabUpdated);

      // Clean up event listeners when allowScanningUrls is false or component unmounts
      return () => {
        chrome?.tabs?.onActivated?.removeListener(handleTabActivated);
        chrome?.tabs?.onUpdated?.removeListener(handleTabUpdated);
      };
    }
  }, [allowScanningUrls]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (allowScanningUrls) {
      intervalId = setInterval(() => {
        incrementSessionTimeCounter();
      }, 1000);
    } else {
      clearInterval(intervalId!);
    }

    // Cleanup the interval on component unmount or when allowScanningUrls changes
    return () => clearInterval(intervalId!);
  }, [allowScanningUrls, incrementSessionTimeCounter]);

  const confirmUrl = () => {
    setCurrentTabUrl(urlToConfirm);
    setShowConfirmation(false);
  };

  const cancelUrl = () => {
    setUrlToConfirm(undefined);
    setShowConfirmation(false);
  };

  return {
    //states
    allowScanningUrls,
    currentTabUrl,
    showConfirmation,
    urlToConfirm,
    sessionTimeCounter,
    clicksWithCounter,
    clicksWithoutCounter,
    maliciousCounter,
    suspiciousCounter,
    harmlessCounter,
    //methods
    //functions
    confirmUrl,
    cancelUrl,
    countOpenTabs,
  };
};

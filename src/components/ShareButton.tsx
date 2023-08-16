"use client";

import { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";

import { ShareIcon } from "@/icons/Share";

interface ShareButtonProps {
  text: string;
  title: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ text, title }) => {
  const [showPanel, setShowPanel] = useState(false);

  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
  const shareDetails = { url: url, title, text };

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareDetails);
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      setShowPanel(true);
    }
  };

  return (
    <Popover className="relative">
      <Popover.Button onClick={handleSharing}>
        <ShareIcon />
      </Popover.Button>

      {showPanel && (
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel
            static
            className="bg-white p-4 rounded-lg drop-shadow absolute flex flex-col gap-3"
          >
            <WhatsappShareButton blankTarget url={url} title={text}>
              <div className="flex items-center gap-2">
                <WhatsappIcon size={24} round />
                <span className="text-sm">Whatsapp</span>
              </div>
            </WhatsappShareButton>

            <LinkedinShareButton blankTarget url={url}>
              <div className="flex items-center gap-2">
                <LinkedinIcon size={24} round />
                <span className="text-sm">LinkedIn</span>
              </div>
            </LinkedinShareButton>

            <TwitterShareButton blankTarget url={url} title={text}>
              <div className="flex items-center gap-2">
                <TwitterIcon size={24} round />
                <span className="text-sm">Twitter</span>
              </div>
            </TwitterShareButton>

            <FacebookShareButton blankTarget url={url} quote={text}>
              <div className="flex items-center gap-2">
                <FacebookIcon size={24} round />
                <span className="text-sm">Facebook</span>
              </div>
            </FacebookShareButton>

            <EmailShareButton blankTarget url={url} subject={text}>
              <div className="flex items-center gap-2">
                <EmailIcon size={24} round />
                <span className="text-sm">Email</span>
              </div>
            </EmailShareButton>
          </Popover.Panel>
        </Transition>
      )}
    </Popover>
  );
};

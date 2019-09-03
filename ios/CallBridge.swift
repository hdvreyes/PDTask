//
//  CallBridge.swift
//  Task
//
//  Created by Habagat Reyes on 02/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import UIKit

@objc(CallBridge)

class CallBridge: NSObject {

  @objc func makeCall(_ phone: String) {
    print("Start making call to: \(phone)")
    DispatchQueue.main.async {
      UIApplication.shared.openURL(NSURL(string: "tel://\(phone)")! as URL)
    }
  }

  /* I'm getting a threading issue here */
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }

}

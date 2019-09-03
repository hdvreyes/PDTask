//
//  CallBridge.m
//  Task
//
//  Created by Habagat Reyes on 02/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"

@interface
  RCT_EXTERN_MODULE(CallBridge, NSObject)
  RCT_EXTERN_METHOD(makeCall:(NSString *) phone)
@end

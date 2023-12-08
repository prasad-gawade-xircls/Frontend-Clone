import React from 'react'
import { Card, CardBody } from 'reactstrap'

const SuperLeadzFAQ = () => {
    return (
        <>
            {/* <Card>
            <CardBody>
                <h4>FAQ</h4>
            </CardBody>
        </Card> */}
            <Card>
                <CardBody>
                    <div id="faq">
                        <h4 className="mb-3"><u>Introduction</u></h4>
                        <div className="first mb-2">
                            <h5 className="mb-2">1. What is SuperLeadz?</h5>
                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. SuperLeadz is a pop-up-based lead generation & conversion tool that converts website visitors to leads to customers, based on past visits and through ready-to-redeem incentives, in the shortest time possible.
                            </p>

                        </div>
                        <div className="second mb-2">
                            <h5 className="mb-2">2. How is SuperLeadz different from other lead generation & conversion tools?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. SuperLeadz is different because of its unique approach to lead capture & lead nurturing. Instead of simply soliciting contact information in exchange for an incentive, SuperLeadz presents the incentive in ways that intrigue, engage, delight and drive the visitor into immediate action. Through OTP verification, leads self-verify their data, guaranteeing high-quality email lists. SuperLeadz is also the first to provide extensive pop-up customization options never seen before so that you can craft the pop-up of your dreams.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">3. How does SuperLeadz personalize and incentivize based on visitor history?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. SuperLeadz enables you to create custom pop-ups for first-time shoppers, returning visitors and customers and dynamically display only certain offers for each of these visitor segments.
                            </p>

                        </div>


                        <div className="second mb-2">
                            <h5 className="mb-2">4. How does Super Leadz help me authenticate lead data?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. Through OTP verification, leads verify their own contact details so that you’re guaranteed 100% authentic lead data for future marketing campaigns.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">5. How do I know whether Super Leadz is the right tool for me?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. Super Leadz is the right tool for you if you want to:
                                i. Reduce website drop-offs and increase average visit time
                                ii. Convert more anonymous visitors into self-qualified leads
                                iii. Personalize your communication to first-time visitors vs. returning shoppers
                                iv. Hyper-customize your pop-ups (multiple offer display, multiple page redirects, placeholder text customization etc.)
                                v. Give your customers one-click offer redemption for a seamless cart experience
                            </p>

                        </div>

                        <h4 className="my-3"><u>Leads</u></h4>

                        <div className="second mb-2">
                            <h5 className="mb-2">1. What is a SuperLeadz lead?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. A visitor who has submitted their contact information via a Super Leadz pop-up is called a lead. A SuperLeadz lead is a high-quality sales qualified lead, primed for instant conversion.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">2. Who is a verified lead?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. A visitor who has authenticated their contact information via OTP verification is called a verified lead. Learn how to activate user verification here.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">3. What is Lead Stage?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. The Lead Stage reflects whether the visitor is yet to make his first purchase or has already purchased i.e. has become a customer.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">4. What is Lead Status?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. The Lead Status reflects whether the lead has verified their email address via OTP authentication. An ‘Unverified’ Lead has not verified their email address. To learn how to enable OTP authentication, go to the User Verification section.
                            </p>

                        </div>

                        <h4 className="my-3"><u>Offers</u></h4>

                        <div className="second mb-2">
                            <h5 className="mb-2">1. What kind of offers can I create?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. You can create three types of offers on SuperLeadz:
                                <ol className="ps-4 m-0">
                                    <li>Discount on Product/s - Redeemable on a specific product or products</li>
                                    <li>Discount on Total Order Value - Redeemable on the total order value</li>
                                    <li>Buy X, Get Y - The customer can claim product/s for free or at a discounted price on purchase of other product/s</li>
                                </ol>

                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">2. How do I ensure the offer/s I’ve created are displayed only to a particular visitor segment?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. You will assign your offer/s while creating a pop-up theme for a particular visitor segment. This will ensure that the offer/s are displayed only to your chosen visitor segment/s.
                            </p>

                        </div>

                        <h4 className="my-3"><u>Button, Pop-ups & Themes</u></h4>

                        <div className="second mb-2">
                            <h5 className="mb-2">1. What is a theme?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. A theme is a pop-up template that you’ve assigned certain conditions to for a specific purpose. e.g. a pop-up that only first-time visitors can see on the home page or a pop-up customized for registered users that is visible on scrolling 35% of any product page.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">2. How do I create/edit a theme?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. To create/edit a theme, go here.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">3. How do I customize a pop-up?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. To customize a pop-up, go to Saved Themes under Themes and edit the pop-up you want to customize.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">4. How do I customize the button?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. To customize the button, go to Button in the Main menu and change the settings as required.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">5. What happens if I try to save a theme that conflicts with an existing theme?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. You will be notified the moment you attempt to save a theme that conflicts with an existing theme or themes. If you choose to go ahead, the existing theme/s will be deactivated so that you can activate the theme you’ve just created.
                            </p>

                        </div>

                        <h4 className="my-3"><u>User Verification</u></h4>

                        <div className="second mb-2">
                            <h5 className="mb-2">1. What is the benefit of user verification?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. User verification through OTP authentication will help you build a 100% genuine email database of sales qualified leads for future marketing campaigns.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">2. How do I enable user verification?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. To enable user verification on an existing theme, edit the theme under Saved Themes. Go to the User verification section under the Pop-up Behaviour tab and toggle off ‘Skip User Verification’. You can also enable user verification while creating a new theme.
                            </p>

                        </div>

                        <div className="second mb-2">
                            <h5 className="mb-2">3. How do I disable user verification?</h5>

                            <p className="faq_ans" style={{ marginLeft: '10px' }}>
                                A. To enable user verification on an existing theme, edit the theme under Saved Themes. Go to the User verification section under the Pop-up Behaviour tab and toggle off ‘Skip User Verification’. You can also enable user verification while creating a new theme.
                            </p>

                        </div>

                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default SuperLeadzFAQ
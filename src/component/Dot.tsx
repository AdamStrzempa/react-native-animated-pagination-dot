/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 *
 */
import React from "react";
import {Animated} from "react-native";

import EmptyDot from './EmptyDot';
import {
    IPropsDot,
    IStateDot,
} from './types/Dot';
import { getDotStyle } from '../util/DotUtils';

class Dot extends React.Component<IPropsDot, IStateDot> {
    constructor (props) {
        super(props);

        const type = getDotStyle({
            idx:props.idx,
            curPage:props.curPage,
            maxPage:props.maxPage,
        });

        this.state = {
            animVal: new Animated.Value(0),
            animate: false,
            prevType: type,
            type: type
        }

    }

    static getDerivedStateFromProps (nextProps, prevState) {
        const nextType = getDotStyle({
            idx:nextProps.idx,
            curPage:nextProps.curPage,
            maxPage:nextProps.maxPage,
        });
        const prevType = prevState.type;

        return {
            animate: ( nextType.size !== prevType.size ) || ( nextType.opacity !== prevType.opacity ),
            prevType: prevType,
            type: nextType
        }
    }

    componentDidUpdate () {

        if (!this.state.animate) return;

        this.state.animVal.setValue(0);

        Animated.timing(
            this.state.animVal, {
                toValue: 1,
                duration: 300,
                useNativeDriver:false
            },
        ).start();
    }


    render () {
        const { idx, curPage, sizeRatio } = this.props;
        const { prevType, type } = this.state;

        if (curPage < 2) {
            if (idx >= 5)
                return (
                    <EmptyDot sizeRatio={sizeRatio} />
                );

        } else if (curPage < 3) {
            if (idx > 5)
                return (
                    <EmptyDot sizeRatio={sizeRatio} />
                );
        }

        const {activeColor} = this.props;


        return (
            <Animated.View
                style={ [ {
                    backgroundColor: curPage !== idx ? '#CBCBD5' : activeColor,
                    margin: 1 * sizeRatio,
                }, {
                    width: 15,
                    height: 2,
                    opacity: 1,
                } ] } />
        )
    }

}

export default Dot;